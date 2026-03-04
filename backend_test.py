import requests
import sys
import json
from datetime import datetime, timedelta

class EuclidesAPITester:
    def __init__(self, base_url="https://animated-website-3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_booking_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_content=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    
                    # Additional content validation
                    if expected_content:
                        for key, expected_value in expected_content.items():
                            if key in response_data:
                                if response_data[key] == expected_value:
                                    print(f"✅ Content validation passed for {key}")
                                else:
                                    print(f"❌ Content validation failed for {key}: expected {expected_value}, got {response_data[key]}")
                                    success = False
                            else:
                                print(f"❌ Missing expected key: {key}")
                                success = False
                    
                    if success:
                        self.tests_passed += 1
                        print(f"✅ Passed - Status: {response.status_code}")
                        return True, response_data
                    else:
                        print(f"❌ Failed - Content validation failed")
                        return False, {}
                        
                except json.JSONDecodeError:
                    print(f"❌ Failed - Invalid JSON response")
                    return False, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error response text: {response.text}")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Request Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Unexpected Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            expected_content={"message": "Euclides Cortes API"}
        )

    def test_get_services(self):
        """Test GET /api/services endpoint"""
        success, response = self.run_test(
            "Get Services",
            "GET",
            "services",
            200
        )
        
        if success:
            # Validate we have 6 services with expected names
            expected_services = ["CORTE CLÁSSICO", "BARBA PREMIUM", "COMBO COMPLETO", "DEGRADÊ MODERNO", "DESIGN PERSONALIZADO", "CORTE INFANTIL"]
            
            if len(response) == 6:
                print(f"✅ Correct number of services: {len(response)}")
                
                service_names = [service['name'] for service in response]
                missing_services = [name for name in expected_services if name not in service_names]
                
                if not missing_services:
                    print("✅ All expected services found")
                    
                    # Validate prices are in R$ 35-40 range
                    valid_prices = ["R$ 35", "R$ 38", "R$ 40"]
                    for service in response:
                        if service['price'] in valid_prices:
                            print(f"✅ {service['name']}: {service['price']} (valid price)")
                        else:
                            print(f"❌ {service['name']}: {service['price']} (invalid price - should be R$ 35-40)")
                            return False, {}
                    
                    # Validate service structure
                    for service in response:
                        required_fields = ['id', 'name', 'description', 'price', 'duration', 'icon']
                        missing_fields = [field for field in required_fields if field not in service]
                        if missing_fields:
                            print(f"❌ Service {service.get('name', 'Unknown')} missing fields: {missing_fields}")
                            return False, {}
                    print("✅ All services have required fields")
                else:
                    print(f"❌ Missing services: {missing_services}")
                    return False, {}
            else:
                print(f"❌ Expected 6 services, got {len(response)}")
                return False, {}
        
        return success, response

    def test_create_booking(self):
        """Test POST /api/bookings endpoint"""
        # Use a future date
        future_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
        
        booking_data = {
            "name": "João Silva",
            "email": "joao@test.com",
            "phone": "(11) 99999-9999",
            "service": "CORTE CLÁSSICO",
            "date": future_date,
            "time": "14:00",
            "notes": "Teste automatizado"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "bookings",
            200,
            data=booking_data
        )
        
        if success:
            # Validate booking response structure
            required_fields = ['id', 'name', 'email', 'phone', 'service', 'date', 'time', 'status', 'created_at']
            missing_fields = [field for field in required_fields if field not in response]
            
            if not missing_fields:
                print("✅ Booking response has all required fields")
                self.created_booking_id = response['id']
                print(f"✅ Created booking with ID: {self.created_booking_id}")
                
                # Validate data matches
                for key in ['name', 'email', 'phone', 'service', 'date', 'time']:
                    if response[key] == booking_data[key]:
                        print(f"✅ {key} matches: {response[key]}")
                    else:
                        print(f"❌ {key} mismatch: expected {booking_data[key]}, got {response[key]}")
                        return False, {}
            else:
                print(f"❌ Booking response missing fields: {missing_fields}")
                return False, {}
        
        return success, response

    def test_get_bookings(self):
        """Test GET /api/bookings endpoint"""
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "bookings",
            200
        )
        
        if success:
            print(f"✅ Retrieved {len(response)} bookings")
            
            # If we created a booking, verify it's in the list
            if self.created_booking_id:
                booking_ids = [booking['id'] for booking in response]
                if self.created_booking_id in booking_ids:
                    print(f"✅ Created booking found in list")
                else:
                    print(f"❌ Created booking not found in list")
                    return False, {}
        
        return success, response

    def test_get_single_booking(self):
        """Test GET /api/bookings/{id} endpoint"""
        if not self.created_booking_id:
            print("⚠️ Skipping single booking test - no booking ID available")
            return True, {}
        
        success, response = self.run_test(
            f"Get Single Booking ({self.created_booking_id})",
            "GET",
            f"bookings/{self.created_booking_id}",
            200
        )
        
        if success:
            if response['id'] == self.created_booking_id:
                print(f"✅ Retrieved correct booking")
            else:
                print(f"❌ Retrieved wrong booking: expected {self.created_booking_id}, got {response['id']}")
                return False, {}
        
        return success, response

def main():
    print("🚀 Starting Euclides Cortes API Tests")
    print("=" * 50)
    
    tester = EuclidesAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_services,
        tester.test_create_booking,
        tester.test_get_bookings,
        tester.test_get_single_booking
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 ALL TESTS PASSED!")
        return 0
    else:
        print("❌ SOME TESTS FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
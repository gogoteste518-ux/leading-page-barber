import requests
import sys
from datetime import datetime, timedelta
import json

class EuclidesAPITester:
    def __init__(self, base_url="https://animated-website-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.booking_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        if success and isinstance(response, dict):
            expected_message = "Euclides Cortes API"
            if response.get('message') == expected_message:
                print(f"✅ Correct API message: {expected_message}")
                return True
            else:
                print(f"❌ Wrong API message. Expected: {expected_message}, Got: {response.get('message')}")
        return False

    def test_services_endpoint(self):
        """Test services endpoint"""
        success, response = self.run_test(
            "Services Endpoint",
            "GET",
            "api/services",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} services")
            
            # Check if we have 6 services
            if len(response) != 6:
                print(f"❌ Expected 6 services, got {len(response)}")
                return False
            
            # Check service structure and prices
            expected_services = [
                {"name": "CORTE CLÁSSICO", "price": "R$ 35"},
                {"name": "BARBA PREMIUM", "price": "R$ 35"},
                {"name": "COMBO COMPLETO", "price": "R$ 40"},
                {"name": "DEGRADÊ MODERNO", "price": "R$ 38"},
                {"name": "DESIGN PERSONALIZADO", "price": "R$ 40"},
                {"name": "CORTE INFANTIL", "price": "R$ 35"}
            ]
            
            for i, service in enumerate(response):
                expected = expected_services[i]
                if service.get('name') == expected['name'] and service.get('price') == expected['price']:
                    print(f"✅ Service {i+1}: {service['name']} - {service['price']}")
                else:
                    print(f"❌ Service {i+1} mismatch. Expected: {expected}, Got: {service.get('name')} - {service.get('price')}")
                    return False
            
            return True
        return False

    def test_create_booking(self):
        """Test creating a booking"""
        # Use tomorrow's date
        tomorrow = datetime.now() + timedelta(days=1)
        booking_date = tomorrow.strftime("%Y-%m-%d")
        
        booking_data = {
            "name": "Carlos Teste",
            "email": "carlos@teste.com",
            "phone": "(11) 97777-7777",
            "service": "COMBO COMPLETO",
            "date": booking_date,
            "time": "16:00",
            "notes": "Teste final"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "api/bookings",
            200,
            data=booking_data
        )
        
        if success and isinstance(response, dict):
            self.booking_id = response.get('id')
            print(f"✅ Booking created with ID: {self.booking_id}")
            
            # Verify booking data
            for key, value in booking_data.items():
                if response.get(key) == value:
                    print(f"✅ {key}: {value}")
                else:
                    print(f"❌ {key} mismatch. Expected: {value}, Got: {response.get(key)}")
                    return False
            return True
        return False

    def test_get_bookings(self):
        """Test getting all bookings"""
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "api/bookings",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} bookings")
            
            # Check if our test booking is in the list
            if self.booking_id:
                booking_found = False
                for booking in response:
                    if booking.get('id') == self.booking_id:
                        booking_found = True
                        print(f"✅ Test booking found in list: {booking['name']}")
                        break
                
                if not booking_found:
                    print(f"❌ Test booking with ID {self.booking_id} not found in list")
                    return False
            
            return True
        return False

    def test_get_single_booking(self):
        """Test getting a single booking by ID"""
        if not self.booking_id:
            print("❌ No booking ID available for single booking test")
            return False
            
        success, response = self.run_test(
            "Get Single Booking",
            "GET",
            f"api/bookings/{self.booking_id}",
            200
        )
        
        if success and isinstance(response, dict):
            if response.get('id') == self.booking_id:
                print(f"✅ Single booking retrieved: {response['name']}")
                return True
            else:
                print(f"❌ Wrong booking returned. Expected ID: {self.booking_id}, Got: {response.get('id')}")
        return False

def main():
    print("🚀 Starting Euclides Cortes API Tests")
    print("=" * 50)
    
    tester = EuclidesAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_services_endpoint,
        tester.test_create_booking,
        tester.test_get_bookings,
        tester.test_get_single_booking
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend API tests PASSED!")
        return 0
    else:
        print("❌ Some backend API tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
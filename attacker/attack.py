import requests

print("Starting attack...")

url = "http://127.0.0.1:9090/login"   # changed localhost → 127.0.0.1

for i in range(10):
    try:
        r = requests.post(
            url,
            json={"username": "admin", "password": "123"},
            timeout=5   # VERY IMPORTANT
        )
        print(f"Request {i}: {r.status_code} - {r.text}")
    except Exception as e:
        print(f"Request {i} failed:", e)
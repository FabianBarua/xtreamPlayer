import requests

url = 'https://connecttvapp.xyz/player_api.php'
username = 'homeondemand'
password = 'vR5jZPUJSWCY'
action = 'get_live_streams'

params = {
    'username': username,
    'password': password,
    'action': action
}

response = requests.get(url, params=params)

if response.status_code == 200:
    live_streams_data = response.json()
    # Ahora puedes trabajar con la lista de transmisiones en vivo (live_streams_data)
    print(live_streams_data)
else:
    print(f'Error {response.status_code}: {response.text}')

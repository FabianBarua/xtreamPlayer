import requests

# Información del usuario y el servidor
user_info = {
    "username": "homeserver",
    "password": "kqNpmZ729C"
}

server_info = {
    "url": "connecttvapp.xyz",
    "port": "80",
    "server_protocol": "http"
}

# Endpoint para obtener la lista de canales
endpoint = f"{server_info['server_protocol']}://{server_info['url']}:{server_info['port']}/player_api.php"

# Solicitud POST para obtener la lista de canales
response = requests.post(endpoint, data=user_info)

# Comprobar si la solicitud fue exitosa (código 200)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error en la solicitud. Código de estado: {response.status_code}")

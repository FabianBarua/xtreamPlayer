import requests
import json

url = 'https://e1.alphtv.com:9200/api/v1/live/all'
headers = {
    'X-Hid': 'TuV2Xt8Yy5XEf6x8EesB2wUN7uEY7n7_A4f_gLpNMwg',
    'X-Version': 'd000-c100-v4.4.1-20230103',
    'X-Token': 'zURYWnZui7JTChmtAQU7A6CbZSoNCyLwIzlzaf-JxIFbLThNaya_MhDDgAJpDW2M9EZOeZ2w6RkslucnEA-sO-eNsTeOs5hg4sYIO_gm_r8GthJExW1CGw83hOptF-t0tfhQ7o7mRG2rpg3NxWkqATObPm39mfCiG8u7C8M3WyL_LKwqdAbm3oRo7otpeHkZmoGIO2YiBwYb0nTcncat-w',
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'okhttp/4.9.3'
}

params = {
    'mode': 'dynamic'
}

response = requests.get(url, params=params, headers=headers, verify=False)  # Desactivar verificación SSL

if response.status_code == 200:
    # Obtener la respuesta en formato JSON
    json_response = response.json()

    # Crear un archivo JSON con la respuesta
    with open('response.json', 'w') as file:
        json.dump(json_response, file, indent=4)

    print("Archivo JSON creado exitosamente.")
else:
    print(f'Error {response.status_code}: {response.text}')

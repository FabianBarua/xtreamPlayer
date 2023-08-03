def corregir_caracteres_especiales(texto):
    correcciones = {
        "Ã¡": "á",
        "Ã©": "é",
        "Ã­": "í",
        "Ã³": "ó",
        "Ãº": "ú",
        "Ã±": "ñ",
        "Ã¿": "ÿ",
        "Ã€": "À",
        "Ãˆ": "È",
        "ÃŒ": "Ì",
        "Ã’": "Ò",
        "Ã™": "Ù",
        "Ã€": "À",
        "Ãˆ": "È",
        "ÃŒ": "Ì",
        "Ã’": "Ò",
        "Ã™": "Ù",
        "Ã„": "Ä",
        "Ã‹": "Ë",
        "Ã�": "Ï",
        "Ã–": "Ö",
        "Ãœ": "Ü",
        "Ã„": "Ä",
        "Ã‹": "Ë",
        "Ã�": "Ï",
        "Ã–": "Ö",
        "Ãœ": "Ü",
        "Ã‚": "Â",
        "ÃŠ": "Ê",
        "ÃŽ": "Î",
        "Ã”": "Ô",
        "Ã›": "Û",
        "Ã‚": "Â",
        "ÃŠ": "Ê",
        "ÃŽ": "Î",
        "Ã”": "Ô",
        "Ã›": "Û",
        "Ã£": "ã",
        "Ãµ": "õ",
        "Ã¢": "â",
        "Ãª": "ê",
        "Ã®": "î",
        "Ã´": "ô",
        "Ã»": "û",
        "Ã£": "ã",
        "Ãµ": "õ",
        "Ã¢": "â",
        "Ãª": "ê",
        "Ã®": "î",
        "Ã´": "ô",
        "Ã»": "û",
        "Ã�": "Á",
        "Ã‰": "É",
        "Ã�": "Í",
        "Ã“": "Ó",
        "Ãš": "Ú",
        "Ã‘": "Ñ",
        "ÃŸ": "ß",
        "Ã€": "à",
        "Ãˆ": "è",
        "ÃŒ": "ì",
        "Ã’": "ò",
        "Ã™": "ù",
        "Ã€": "à",
        "Ãˆ": "è",
        "ÃŒ": "ì",
        "Ã’": "ò",
        "Ã™": "ù",
        "Ã¤": "ä",
        "Ã«": "ë",
        "Ã¯": "ï",
        "Ã¶": "ö",
        "Ã¼": "ü",
        "Ã¤": "ä",
        "Ã«": "ë",
        "Ã¯": "ï",
        "Ã¶": "ö",
        "Ã¼": "ü",
        "Ã‡": "Ç",
        "Ã§": "ç",
        "Ã�": "Æ",
        "Ã�": "Œ",
        "Ã‘": "Ÿ",
        "Ã¥": "å",
        "Ã†": "Æ",
        "ÃŒ": "Œ",
        "Ã‰": "Ð",
        "Ã�": "ß",
        "Ã¥": "å",
        "Ã†": "Æ",
        "ÃŒ": "Œ",
        "Ã‰": "Ð",
        "Ã�": "ß",
        "Ã¦": "æ",
        "Ã¾": "þ",
        "Ã°": "ð",
        "Ã¦": "æ",
        "Ã¾": "þ",
        "Ã°": "ð",
        "ÃŸ": "þ"
    }
    
    for caracter, correccion in correcciones.items():
        texto = texto.replace(caracter, correccion)
    
    return texto

# Ruta del archivo m3u original
ruta_archivo_original = "m3ulist.m3u"
# Ruta donde guardar la lista corregida
ruta_archivo_corregido = "m3ulist2.m3u"

# Leer contenido del archivo m3u original
with open(ruta_archivo_original, "r", encoding="utf-8") as archivo_origen:
    lista_original = archivo_origen.read()

# Corregir caracteres especiales en la lista
lista_corregida = corregir_caracteres_especiales(lista_original)

# Guardar la lista corregida en el archivo m3u de destino
with open(ruta_archivo_corregido, "w", encoding="utf-8") as archivo_destino:
    archivo_destino.write(lista_corregida)

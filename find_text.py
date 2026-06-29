import os

search_ru = "Получайте ответы"
search_en = "Smart Talk"

for file in ['index.html', 'ru/index.html']:
    if os.path.exists(file):
        with open(file, encoding='utf-8') as f:
            content = f.read()
        print(f"{file}:")
        print(f"  - '{search_ru}' in file:", search_ru in content)
        print(f"  - '{search_en}' in file:", search_en in content)

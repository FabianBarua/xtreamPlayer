def find_duplicates(m3u_content):
    lines = m3u_content.strip().split('\n')
    link_count = {}
    duplicates = []

    for line in lines:
        if line.startswith('#EXTINF:-1'):
            link = lines[lines.index(line) + 1]
            link_count[link] = link_count.get(link, 0) + 1
            if link_count[link] > 1 and link not in duplicates:
                duplicates.append(link)

    return duplicates


def clean_m3u(m3u_content):
    lines = m3u_content.strip().split('\n')
    cleaned_lines = []
    unique_links = set()

    for line in lines:
        if line.startswith('#EXTINF:-1'):
            link = lines[lines.index(line) + 1]
            if link not in unique_links:
                cleaned_lines.append(line)
                cleaned_lines.append(link)
                unique_links.add(link)

    cleaned_m3u = '\n'.join(cleaned_lines)
    return cleaned_m3u


def load_m3u_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            m3u_content = file.read()
            return m3u_content
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None


def save_cleaned_m3u(file_path, cleaned_m3u):
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(cleaned_m3u)
            print(f"Cleaned M3U file saved at '{file_path}'.")
    except Exception as e:
        print(f"Error while saving the cleaned M3U file: {e}")


if __name__ == "__main__":
    input_m3u_file = "m3ulist.m3u"  # Replace with the path to your input M3U file
    output_m3u_file = "output.m3u"  # Replace with the desired output path

    m3u_content = load_m3u_file(input_m3u_file)
    if m3u_content:
        duplicates = find_duplicates(m3u_content)
        if duplicates:
            print("Duplicated links found:")
            for duplicate in duplicates:
                print(duplicate)
        else:
            print("No duplicates found in the M3U file.")

        cleaned_m3u = clean_m3u(m3u_content)
        save_cleaned_m3u(output_m3u_file, cleaned_m3u)

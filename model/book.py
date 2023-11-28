import os
import pandas as pd
import base64
import requests

# 이미지 파일을 Base64로 인코딩하는 함수
def encode_image_to_base64(image_url):
    try:
        # 웹에서 이미지 다운로드
        response = requests.get(image_url)
        if response.status_code == 200:
            # 이미지 데이터를 Base64로 인코딩
            base64_image = base64.b64encode(response.content).decode('utf-8')
            return base64_image
        else:
            print(f"Failed to download image. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

# topic modeling result image 반환
def get_topic_images(emotion):    
    image_list = []
    for i in range(3):
        localpath = 'E:/2023-2 YBIGTA/pythonProject'
        filepath = f'{localpath}/topic_modeling/results/{emotion}_topic_{str(i+1)}.png'
        with open(filepath, 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            image_list.append(encoded_image)
    return image_list

# 책 정보 dataframe 형식으로 넘기기
def book_info(emotion, topic, book_type):
    localpath = 'E:/2023-2 YBIGTA/pythonProject'
    filepath = f'{localpath}/topic_modeling/results/{emotion}_topic_labeled.csv'
    df = pd.read_csv(filepath, encoding='utf-8')
    
    topic_str = f"Topic #{topic}"
    df = df[df['topic'] == topic_str]
    df = df[df['book_type'] == book_type]
    
    # 같은 책인 경우 가장 높은 rate를 가진 행만 남기고 나머지 삭제
    df['first_5_chars'] = df['book_name'].str[:5]
    df = df.sort_values(by=['probability'], ascending=False)
    df = df.drop_duplicates(subset=['first_5_chars'], keep='first')
    df = df.drop(columns=['first_5_chars'])
    
    top_5_books = df[:5]
    top_5_books['book_img'] = top_5_books['book_imgurl'].apply(lambda img_url: encode_image_to_base64(img_url))

    book_info = top_5_books[['book_name', 'book_explain', 'author', 'publisher', 'price', 'rate', 'book_img', 'probability']]
    return book_info

from flask import Flask, session, request, jsonify
from flask_cors import CORS

from emotion_model import predict
from book import get_topic_images, book_info
from generation import chat

app = Flask(__name__)
app.secret_key = 'datogether1128'
app.config['DEBUG'] = True
CORS(app)        

# 응답 & Topic 이미지 전송
@app.route('/user_input', methods=['POST'])
def user_input():
    if request.method == 'POST':
        data = request.get_json()
        data = data.get('user_input', '')
        if not data:
            return jsonify({'error': '유효하지 않은 입력입니다.'})
        
        # 감정 예측
        emotion = predict(data)
        
        # 감정 값을 session에 저장 - 다음 함수 때 사용 가능
        session['emotion'] = emotion
        app.logger.info(f"Emotion from session: {session['emotion']}")
        
        topic_images_list = get_topic_images(emotion)
        chat_response = chat(data)
        message = f"{chat_response} \n 당신의 말에서 {emotion}의 감정이 느껴집니다."
        
        response = {'message': message,
                    'topic_images_list': topic_images_list,
                    'emotion': emotion}
        
        return jsonify(response)
    else:
        return jsonify({'message': 'Invalid Request.'})


@app.route('/get_topic', methods=['POST'])
def get_topic():
    data = request.get_json()  
    topic_index = data.get('user_input')  # 'index' 키의 값을 가져옴
    if isinstance(topic_index, int):
        session['topic'] = topic_index + 1
        app.logger.info(f"Topic from session: {session['topic']}")
        return jsonify({'message': f'Topic index {topic_index + 1} saved in session'}), 200
    else:
        return jsonify({'error': 'Index must be an integer'}), 400

    
# 도서 데이터 전송
@app.route('/get_info', methods=['POST'])
def get_book_info():
    
    data = request.get_json()
    genre = data.get('genre')
    topic = data.get('index') + 1
    emotion = data.get('emotion')
    
    if not emotion or not topic or not genre:
        return jsonify({'error': 'Emotion and genre are required'}), 400

    try:
        book_details = book_info(emotion, topic, genre)
        
        # 'base64_image' 열을 포함한 데이터프레임을 JSON으로 변환
        BookInfo = book_details.to_json(orient='records', force_ascii=False)  # df to json
        
        return BookInfo
    
    except Exception as e:
        app.logger.error(f"Error getting book info: {e}")  # 로깅
        return jsonify({'error': 'Internal server error'}), 500
    
if __name__=="__main__":
    app.run(debug=True)
    
## session은 필요 없음
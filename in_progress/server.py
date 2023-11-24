from flask import Flask, render_template, request, jsonify
from emotion_model import predict
from book import get_books_info

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    return render_template('index.html')

# const handleButtonClick = () => {
#     fetch('http://localhost:5000/react_to_flask', { // Flask 서버 URL로 변경
#         method: 'POST',
#         headers: {
#             'Content-Type': 'application/json',
#         },
#         body: JSON.stringify({ user_input: textValue })
#     })
#     .then(response => response.json())
#     .then(data => {
#         console.log('Response from Flask:', data);
#         // 예를 들어, data.message를 화면에 표시할 수 있습니다.
#     })
#     .catch(error => {
#         console.error('Error:', error);
#     });
# };

# react에서 사용자 응답 받아오기
@app.route('/user_input', methods=['POST'])
def user_input_sentiment():
    if request.method == 'POST':
        data = request.get_json()
        user_input = data['user_input']
        emotion = predict(user_input)
        response = {'message': f"당신의 말에서 {emotion}의 감정이 느껴집니다.",
                    'user_input': user_input}
        return jsonify(response)
    else:
        return jsonify({'message': 'Invalid Request.'})

# // 첫 번째 요청에서 emotion 받기
# fetch('/user_input', {
#   method: 'POST',
#   headers: {
#     'Content-Type': 'application/json'
#   },
#   body: JSON.stringify({ user_input: '사용자의 텍스트' })
# })
#   .then(response => response.json())
#   .then(data => {
#     // 두 번째 요청에 emotion 포함
#     return fetch('/get_books', {
#       method: 'POST',
#       headers: {
#         'Content-Type': 'application/json'
#       },
#       body: JSON.stringify({
#         emotion: data.emotion, // 여기서 emotion을 사용
#         genre: '소설',
#         topic: '모험'
#       })
#     });
#   })
#   .then(response => response.json())
#   .then(data => {
#     // 최종 데이터 처리
#     console.log(data);
#   })
#   .catch(error => {
#     console.error('Error:', error);
#   });

@app.route('/get_books', methods=['POST'])
def get_books():
    data = request.json
    emotion = data.get('emotion')
    genre = data.get('genre')
    topic = data.get('topic')

    if not emotion or not genre:
        return jsonify({'error': 'Emotion and genre are required'}), 400

    try:
        book_details = get_books_info(emotion, genre, topic)    # output: df
        result_json = book_details.to_json(orient='records', force_ascii=False)  # df to json
        return result_json

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__=="__main__":
    app.run(debug=True, port=5000)
import re
from transformers import pipeline

IGNORE_INDEX = -100
DEFAULT_PAD_TOKEN = "[PAD]"
DEFAULT_EOS_TOKEN = "</s>"
DEFAULT_BOS_TOKEN = "</s>"
DEFAULT_UNK_TOKEN = "</s>"
PROMPT_DICT = {
    "prompt_input": (
        "### Instruction(명령어):\n{prompt}\n\n### Input(입력):\n{input}\n\n### Response(응답):"
    ),
    "prompt_no_input": (
        "### Instruction(명령어):\n{prompt}\n\n### Response(응답):"
    ),
}

# 각자 경로로 설정
path = 'E:/2023-2 YBIGTA/pythonProject/output_1_SFT'
# 학습된 모델 -> 공유 Drive
generator = pipeline('text-generation', model=path+'/model', tokenizer=path+'/tokenizer')

generation_args = dict(
    num_beams=4,
    repetition_penalty=2.0,
    no_repeat_ngram_size=4,
    eos_token_id=375, # \n
    max_new_tokens=64,
    do_sample=True,
    top_k=50,
    early_stopping=True
)

def chat(user_input):
    user_input_list = [user_input]
    list_prompt = [PROMPT_DICT['prompt_no_input'].format_map({'prompt' : tmp}) for tmp in user_input_list]
    list_result = generator(list_prompt, **generation_args)
    # print("list_result", list_result)
    for prompt, result in zip(list_prompt, list_result):
        generated_text = result[0]['generated_text']
        # print(result[0]['generated_text'])
    response_text = generated_text.split("### Response(응답):")[1]

    sentence_pattern = r'[^.!?]+[.!?]'
    sentences = re.findall(sentence_pattern, response_text)
    if len(sentences) >= 2:
        first_two_sentences = ''.join(sentences[:2])
    else:
        first_two_sentences = response_text.strip()  # 문장부호 없이 전체 문장 가져오기

    return(first_two_sentences)

import gradio as gr
import time
import pynvml
from langchain_community.llms import Ollama
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

pynvml.nvmlInit()

llm = Ollama(
    model="timenest",
    callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]),
    temperature=0.9,
)

print('Chatbot ready')

prompt = PromptTemplate(
    input_variables=["topic"],
    template="{topic}",
)

chain = LLMChain(llm=llm, prompt=prompt, verbose=False)

def chatbot(input_text):
    if input_text.lower() == "exit":
        return "Exiting the chatbot. Goodbye!"
    
    response = chain.run(input_text)
    return response

def check_gpu_usage():
    handle = pynvml.nvmlDeviceGetHandleByIndex(0)
    gpu_utilization = pynvml.nvmlDeviceGetUtilizationRates(handle).gpu
    return gpu_utilization

with gr.Blocks() as demo:
    gr.Markdown("# Timenest Chatbot")

    chatbot_interface = gr.Chatbot(label="Timenest Chatbot")
    msg = gr.Textbox(label="Type your message here...")
    submit = gr.Button("Submit")
    # alert_box = gr.Markdown(value="", visible=True)
    
    def respond(message, history):
        # gpu_usage = check_gpu_usage()
        # gpu_threshold = 80
        # print('\n'+gpu_usage)
        # if gpu_usage > gpu_threshold:
        #     alert_message = f"Hệ thống đang thở, GPU usage is high: {gpu_usage}%"
        # else:
        #     alert_message = ""

        response = chatbot(message)

        return history + [[message, response]], ""

    submit.click(respond, [msg, chatbot_interface], [chatbot_interface, msg])
    msg.submit(respond, [msg, chatbot_interface], [chatbot_interface, msg])

demo.launch(share=True)

pynvml.nvmlShutdown()

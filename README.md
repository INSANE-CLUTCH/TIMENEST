# Backend and Infrastructure

**Backend**: The system utilizes an AVL tree structure to query user tasks faster and more efficiently. The AVL tree, with its self-balancing properties, ensures that searching, adding, and deleting tasks all have a time complexity of O(log n), optimizing processing speed for user time management.

**Database**: **MongoDB** (a NoSQL database) is used to optimize query time and store unstructured data such as tasks and user schedules. MongoDB’s flexible scaling and support for heterogeneous queries help ensure the chatbot operates smoothly and efficiently when providing real-time information.

# Generative AI

**AI**: The chatbot uses a large language model **LLM (Llama 70B)** combined with advanced techniques like **Retrieval-Augmented Generation (RAG)**, **Function Calling**, and **Semantic Search**. This combination allows the chatbot to focus on time management and provide accurate, up-to-date answers while minimizing hallucination (incorrect information generation).

---

# Retrieval-Augmented Generation (RAG)

**Retrieval-Augmented Generation (RAG)** is a natural language processing (NLP) technique that combines the strengths of both retrieval-based and generative AI models. This technique allows the chatbot to search for information from external sources and use it to generate more natural and contextually relevant answers. The combination of these two models helps the chatbot not only rely on its internal knowledge base but also stay updated with new information, reducing the occurrence of outdated information and hallucination (generating incorrect information).

Steps to implement a RAG system include:

1. **Retrieval**: The chatbot first retrieves relevant information from external data sources such as documents, websites, databases, or knowledge repositories. The retrieval process may use **Information Retrieval** models, which assess the semantic similarity of documents.

2. **Generation**: After retrieving the information, the generative part of RAG uses this as additional context to generate a suitable response. The response will be based on both the internal knowledge and the newly retrieved information, ensuring it is up-to-date and accurate.

3. **Fusion**: The final step combines the retrieved information with the generative model’s natural language capabilities to produce a comprehensive, easy-to-understand response.

# Integrating Data Crawling into the System

We have built a dataset by crawling multiple news sources online, including the latest articles related to time management, personal productivity, and effective work methods. This data helps the chatbot stay updated on external knowledge, focusing on specialized and specific content, providing users with high-value information.

# Main Functions of the Chatbot

## Function 1: Asking Advice to Manage Time Better

We have incorporated a large amount of advice from time management experts, along with analyses of procrastination behavior and how to overcome it. With the integration of RAG, the chatbot can retrieve the latest information from top experts in time management and automatically adjust its responses based on the specific context of the user.

## Function 2: Asking the Database

The chatbot can connect directly to the user's database to retrieve information such as the status of tasks in their schedule, analyze it, and provide suggestions for the user’s activities. By combining RAG, the chatbot can provide insights and recommendations not only based on the internal database but also by incorporating external information to suggest a more reasonable plan for the user.

## Function 3: Saving Constraints

We have developed a method for storing conditions specified by the user in the prompt and saving them into a file. This storage allows the chatbot to remember the user’s previous constraints and provide more relevant suggestions in the future.

### Advanced Technique:

To avoid reviewing similar conditions repeatedly, we use **Semantic Search** to identify and eliminate sentences with a similarity level above a certain threshold (threshold = 0.88).

## Function 4: Loading Constraints

When the user requests suggestions or reschedules a task, the chatbot will utilize the previously saved constraints to provide appropriate recommendations. This helps the chatbot give more personalized responses, accurately meeting the user's needs based on the stored information.

---

These techniques not only help improve the chatbot's accuracy and personalization but also extend its ability to handle complex and diverse user scenarios.

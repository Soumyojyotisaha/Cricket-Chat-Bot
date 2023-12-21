# Cricket ChatBot using RAG (Retrieval and Augmented Generation) Algorithm

A project that leverages World Cup 2023 data from Crickbuzz.com, scraped and transformed into embeddings using the "text-embedding-ada-002" model. The data is stored row-wise in an online database on supabase.com. The user interface includes a chatbot and research bot for processing user questions. The queries are converted into chunks, and similarity searches of embeddings are performed to identify keywords. The CHAT OPENAI Model 3.5 turbo then formulates suitable answers based on the identified keywords.

## Database link:
```bash
https://supabase.com/dashboard/project/owjzzdbdtbxmzjfuvktr/editor/29257
```

## Technologies Used

- **Frameworks:**
  - Next.js
  - Tailwind CSS
  - TypeScript
  - Node.js

- **Tools:**
  - Openai 3.5-turbo
  - Material UI
  - Supabase
  - IDE: VSCode

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Soumyojyotisaha/Cricket-Chat-Bot.git
   cd Cricket-Chat-Bot
   npm install
   npm run dev


2.**Usage:**
Access the application through the provided link.
Use the chatbot to interact and ask questions about World Cup 2023 data.
The system will process the queries, perform similarity searches, and provide relevant answers.

3.**Contribution:**
Feel free to contribute to the project by submitting issues or pull requests. For major changes, please open an issue to discuss the proposed changes.

4.**License:**
This project is licensed under the MIT License - see the LICENSE file for details.
Replace the placeholders with your actual project details, and feel free to enhance the README based on your project's specific features and requirements.

5.**Screenshots**

![UI1](https://github.com/Soumyojyotisaha/Cricket-Chat-Bot/blob/main/ui1.png)
![UI2](https://github.com/Soumyojyotisaha/Cricket-Chat-Bot/blob/main/ui2.png)
![UI3](https://github.com/Soumyojyotisaha/Cricket-Chat-Bot/blob/main/ui3.png)
![DB1](https://github.com/Soumyojyotisaha/Cricket-Chat-Bot/blob/main/db1.png)
![DB2](https://github.com/Soumyojyotisaha/Cricket-Chat-Bot/blob/main/db2.png)

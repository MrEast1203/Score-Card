## Setup

1. add your .env in '/backend'
2. cd frontend && yarn install
3. cd ../backend && yarn install
4. cd .. && yarn start
5. 開一個新的終端機並輸入 yarn server

已完成以下 3 個進階要求
• 將 “Add” 與 “Query” 分成兩個 tabs, 各自按下時會切換不同的 views (取代原來的 console)
• 在 “Add” 的 view, 跟原來的基礎功能一樣可以輸入 { Name, Subject, Score }, 然後下方的 console 除了
顯示 “Updating (Name, Subject, Score)” 之外，也顯示出新增完之後這個人 (Name) 的所有資料，以表
格 (table) 的方式顯示
• 在 “Query” 的 view, 跟原來的基礎功能一樣可以輸入 { QueryType, QueryString }, 然後下方以表格 (table)
的方式顯示搜尋結果。如果搜尋不到，一樣顯示 “QueryType (QueryString) not found!”

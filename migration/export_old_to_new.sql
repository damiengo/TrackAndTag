SELECT 
 "INSERT INTO activity ('title', 'description', 'quantity', 'madeAt', 'createdAt') VALUES ('"||a.title||"', '"||a.description||"', "||a.number||", "||a.madeAt||", "||a.createdAt||");", 
 GROUP_CONCAT("INSERT OR IGNORE INTO tag ('label', 'description', 'unit', 'createdAt') VALUES ('"||t.text||"', '', '', "||t.createdAt||");INSERT INTO activity_tag ('activityId', 'tagId', 'createdAt') VALUES ((select seq from sqlite_sequence where name='activity'), (select id from tag where label='"||t.text||"'), Date('now'));", "")
FROM 
Activity a 
INNER JOIN ActivityTag at ON a.activityId = at.activityId
INNER JOIN Tag t ON at.tagId = t.tagId
GROUP BY a.activityId;
import { openDB } from 'idb';

const initdb = async () => {
    console.log("initdb called");
    try {
        const db = await openDB('editors', 1, {
            upgrade(db) {
                console.log("I am here!!!")
                if (!db.objectStoreNames.contains('htmlStore')) {
                    db.createObjectStore('htmlStore', { keyPath: 'id', autoIncrement: true });
                    console.log('htmlStore object store created');
                }
                if (!db.objectStoreNames.contains('cssStore')) {
                    db.createObjectStore('cssStore', { keyPath: 'id', autoIncrement: true });
                    console.log('cssStore object store created');
                }
                if (!db.objectStoreNames.contains('javaScriptStore')) {
                    db.createObjectStore('javaScriptStore', { keyPath: 'id', autoIncrement: true });
                    console.log('javaScriptStore object store created');
                }
                console.log('Editor databases upgraded');
            },
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

export const putHtmlDb = async (content) => {
    console.log(content);
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['htmlStore'], 'readwrite');
        const store = tx.objectStore('htmlStore');
        const request = store.put({ id: 1, value: content });
        const result = await request;
        console.log('data saved to the database', result);
    } catch (error) {
        console.error('Error storing data in htmlStore:', error);
    }
};
export const putCssDb = async (content) => {
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['cssStore'], 'readwrite');
        const store = tx.objectStore('cssStore');
        const request = store.put({ id: 1, value: content });
        const result = await request;
        console.log('data saved to the database', result);

    } catch (error) {
        console.error('Error storing data in htmlStore:', error);
    }
};
export const putJavaScriptDb = async (content) => {
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['javaScriptStore'], 'readwrite');
        const store = tx.objectStore('javaScriptStore');
        const request = store.put({ id: 1, value: content });
        const result = await request;
        console.log('data saved to the database', result);
    } catch (error) {
        console.error('Error storing data in htmlStore:', error);
    }
};

export const getHtmlDb = async () => {
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['htmlStore'], 'readonly');
        const store = tx.objectStore('htmlStore');
        const request = store.getAll();
        const result = await request;
        console.log('result', result);
        return result[0]?.value;
    } catch (error) {
        console.error('Error retrieving data from htmlStore:', error);
        return null;
    }
};
export const getCssDb = async () => {
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['cssStore'], 'readonly');
        const store = tx.objectStore('cssStore');
        const request = store.getAll();
        const result = await request;
        console.log('result', result);
        return result[0]?.value;
    } catch (error) {
        console.error('Error retrieving data from cssStore:', error);
        return null;
    }
};
export const getJavaScriptDb = async () => {
    try {
        const editorDb = await openDB('editors', 1);
        const tx = editorDb.transaction(['javaScriptStore'], 'readonly');
        const store = tx.objectStore('javaScriptStore');
        const request = store.getAll();
        const result = await request;
        console.log('result', result);
        return result[0]?.value;
    } catch (error) {
        console.error('Error retrieving data from javaScriptStore:', error);
        return null;
    }
};
initdb();
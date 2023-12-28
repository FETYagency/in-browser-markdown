import { nanoid } from "@reduxjs/toolkit";
import { HttpResponse, delay, http, passthrough } from "msw";
function Doc(id, name, content, createdAt) {
  this.id = id;
  this.name = name;
  this.content = content;
  this.createdAt = createdAt;
}
const documents = new Map();
export const handlers = [
  http.get("/apiMocks/documents", async () => {
    const extract = [...documents.values()];
    await delay();
    return HttpResponse.json(extract, { status: 200 });
  }),
  http.patch("/apiMocks/update/:docId", async ({ params, request }) => {
    const extract = await request.json();
    const { docId } = params;
    const doc = documents.get(docId);
    const docs = documents.set(docId, {
      ...doc,
      ...extract,
    });
    const updatedDoc = docs.get(docId);
    await delay();
    return HttpResponse.json(updatedDoc);
  }),
  http.post("/apiMocks/create/document", async () => {
    const date = new Date();
    const generatedId = nanoid();
    const instance = new Doc(generatedId, "untiteled.md", "", date);
    const dox = documents.set(generatedId, instance);
    await delay();
    return HttpResponse.json(instance, { status: 200 });
  }),
  http.delete("/apiMocks/destroy/:docId", async ({ params }) => {
    const { docId } = params;
    const dox = documents.delete(docId);
    await delay()
    return HttpResponse.text(docId);
  }),
];

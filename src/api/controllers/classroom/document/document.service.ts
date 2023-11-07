import { Document } from "@entities/index";
import { DocumentRepository } from "./document.repository";

const createDocument = async (body: Document) => {
  const result = await DocumentRepository.insert(body);
  return result;
};

const getAllDocument = async (body: Document) => {
  const result = await DocumentRepository.insert(body);
  return result;
};

const getOneDocument = async (body: Document) => {
  const result = await DocumentRepository.insert(body);
  return result;
};

const updateDocument = async (body: Document) => {
  const result = await DocumentRepository.insert(body);
  return result;
};

const deleteDocument = async (body: Document) => {
  const result = await DocumentRepository.insert(body);
  return result;
};

export {
  createDocument,
  getOneDocument,
  getAllDocument,
  updateDocument,
  deleteDocument,
};

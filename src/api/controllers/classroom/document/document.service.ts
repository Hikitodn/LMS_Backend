import { Document, FileUpload } from "@entities/index";
import { DocumentRepository } from "./document.repository";
import { KeyValueType, SearchCustomOptions } from "@utils/instance";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";

const createDocument = async (
  user: KeyValueType<string>,
  _classroomId: string,
  body: Document
) => {
  const existedDocument = await DocumentRepository.findOne({
    where: { name: body.name, classroom: { user: { id: user.id } } },
  });

  if (existedDocument)
    throw new ApiError({
      message: `Existed document name ${existedDocument.name}`,
      status: httpStatus.BAD_REQUEST,
    });

  const file_upload = new FileUpload();
  file_upload;

  const newDocument = new Document();
  newDocument.name = body.name;
  newDocument.description = body.description;
  newDocument.file_upload;

  // const result = await DocumentRepository.insert(newDocument);
  // return result;
};

const getAllDocument = async (
  reqId: { classroomId: string; documentId: string },
  { column, type = "asc", page = 1, perPage = 10 }: SearchCustomOptions
) => {
  const result = await DocumentRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    cache: true,
    relations: { classroom: true },
    where: { classroom: { id: reqId.classroomId } },
    order: {
      [`${column === "name" ? "name" : "created_at"}`]: type,
    },
  });
  return result;
};

const getOneDocument = async (id: string) => {
  const result = await DocumentRepository.findOneOrFail({ where: { id: id } });
  return result;
};

const updateDocument = async (id: string, body: Document) => {
  const result = await DocumentRepository.update(id, body);
  return result;
};

const deleteDocument = async (id: string) => {
  const result = await DocumentRepository.delete(id);
  return result;
};

export default {
  createDocument,
  getOneDocument,
  getAllDocument,
  updateDocument,
  deleteDocument,
};

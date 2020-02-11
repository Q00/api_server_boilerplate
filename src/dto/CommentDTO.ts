import { IcommentDTO, IdepthCommentDTO } from '../service/BaseCommentService';

export class IcommentDTOClass
  implements Pick<IcommentDTO, 'comment' | 'boardId'> {
  comment!: string;
  boardId!: number;
}

export class IdepthCommentDTOClass
  implements Pick<IdepthCommentDTO, 'comment' | 'commentId'> {
  comment!: string;
  commentId!: number;
}

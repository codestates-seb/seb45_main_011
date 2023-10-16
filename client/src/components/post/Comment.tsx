import { useForm } from 'react-hook-form';

import usePostStore from '@/stores/postStore';
import useUserStore from '@/stores/userStore';

import useEditCommentMutation from '@/hooks/useEditCommentMutation';

import { PostProfile, DateAndControlSection } from '@/components/post';
import CommonButton from '../common/CommonButton';

import { CommentDataInfo } from '@/types/data';
import { CommentInputValue } from '@/types/common';

import { COMMENT } from '@/constants/contents';

interface CommentProps {
  comment: CommentDataInfo | null;
  boardId: string | null;
}

export default function Comment({ comment, boardId }: CommentProps) {
  if (!comment || !boardId) return null;

  const { editMode, targetId, setEditMode } = usePostStore();
  const { userId } = useUserStore();

  const { mutate: editComment } = useEditCommentMutation({ boardId, targetId });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CommentInputValue>({
    defaultValues: {
      comment: comment.content,
    },
  });

  const isEdit = editMode && String(comment.commentId) === targetId;

  const isOwner = userId === String(comment.accountId);

  const submitCommentForm = (data: CommentInputValue) => {
    editComment(data);
    setEditMode(false);
  };

  return (
    <li className="pl-[1.375rem] mb-8 max-[500px]:pl-0">
      <div className="flex justify-between mb-2 relative max-[500px]:items-end">
        <PostProfile
          userId={comment.accountId}
          displayName={comment.displayName}
          grade={comment.grade}
          profileImageUrl={comment.profileUrl}
          usage="comment"
        />
        <DateAndControlSection
          date={new Date(comment?.createdAt)}
          isOwner={isOwner}
          usage="comment"
          ownerId={String(comment.accountId)}
          targetId={String(comment.commentId)}
        />
      </div>
      <div className="pl-11 max-[550px]:pl-0">
        {isEdit ? (
          <form onSubmit={handleSubmit(submitCommentForm)}>
            <input
              autoFocus={true}
              className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow outline-none max-[500px]:py-[0.5rem]  max-[500px]:text-[0.5rem]"
              {...register('comment', {
                maxLength: {
                  value: COMMENT.maxLength.value,
                  message: COMMENT.maxLength.errorMessage,
                },
              })}
            />
            {isEdit && (
              <div className="flex p-2 justify-end gap-2">
                <CommonButton size="sm" type="submit">
                  수정
                </CommonButton>
                <CommonButton
                  size="sm"
                  type="button"
                  onClick={() => setEditMode(false)}
                  disabled={isSubmitting}>
                  취소
                </CommonButton>
              </div>
            )}
          </form>
        ) : (
          <p className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow max-[500px]:px-[0.6rem] max-[500px]:py-[0.5rem]  max-[500px]:text-[0.5rem]">
            {comment.content}
          </p>
        )}
      </div>
    </li>
  );
}

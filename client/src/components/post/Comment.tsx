import { useForm } from 'react-hook-form';

import usePostStore from '@/stores/postStore';

import PostProfile from './PostProfile';
import DateAndControlSection from './DateAndControlSection';
import CommonButton from '../common/CommonButton';

import { CommentDataInfo } from '@/types/data';
import { CommentInputValue } from '@/types/common';

interface CommentProps {
  comment: CommentDataInfo | null;
}

export default function Comment({ comment }: CommentProps) {
  if (!comment) return null;

  const { register, handleSubmit } = useForm<CommentInputValue>({
    defaultValues: {
      comment: comment.content,
    },
  });

  const { editMode, targetId, setEditMode } = usePostStore();

  const isEdit = editMode && comment.commentId === targetId;

  return (
    <li className="pl-[1.375rem] mb-8">
      <div className="flex justify-between mb-2">
        <PostProfile
          userId={1}
          displayName={comment.displayName}
          grade="브론즈 가드너"
          profileImageUrl={comment.profileUrl}
          usage="comment"
        />
        {isEdit || (
          <DateAndControlSection
            date={new Date(comment?.createdAt)}
            usage="comment"
            ownerId={comment.accountId}
            targetId={comment.commentId}
          />
        )}
      </div>
      <div className="pl-11">
        {isEdit ? (
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input
              autoFocus={true}
              className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow outline-none"
              {...register('comment')}
            />
            {isEdit && (
              <div className="flex p-2 justify-end gap-2">
                <CommonButton size="sm" type="submit">
                  수정
                </CommonButton>
                <CommonButton
                  size="sm"
                  type="button"
                  onClick={() => setEditMode(false)}>
                  취소
                </CommonButton>
              </div>
            )}
          </form>
        ) : (
          <p className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow">
            {comment.content}
          </p>
        )}
      </div>
    </li>
  );
}

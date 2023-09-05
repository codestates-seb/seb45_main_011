'use client';

import { useState } from 'react';

import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';
import { SIGNIN_REQUIRE } from '@/constants/contents';

interface AuthenticateEmailProps {
  isAuthEmail: boolean;
  setIsAuthEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthenticateEmail({
  isAuthEmail,
  setIsAuthEmail,
  setIsSuccess,
}: AuthenticateEmailProps) {
  const [isCode, setIsCode] = useState<string>('codeModal');
  const [userCode, setUserCode] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCode(e.target.value);
  };

  const handleJudgment = () => {
    //TODO: 서버에서 받아온 인증 번호가 사용자가 입력한 인증 번호랑 맞는지 확인하기
    if (userCode !== '' && userCode === '서버에서 받아올 인증번호') {
      setIsCode('');
      setIsAuthEmail(false);
      setIsSuccess(true);
    }

    setIsCode('failureModal');
  };

  // AuthEmail Failure
  const codeFailureModal = () => {
    if (isCode === 'failureModal') {
      return (
        <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="font-bold text-brown-70 text-[28px]">
                인증에 <span className="text-red-50">실패했습니다.</span>
              </p>
              <p className="font-bold text-brown-90  text-[28px]">
                다시 입력해주세요.
              </p>
            </div>
            <div>
              <CommonButton
                usage="button"
                size="md"
                children="뒤로 가기"
                className="w-[155px] h-[52px] text-[24px]"
                handleBack={() => setIsCode('codeModal')}
              />
            </div>
          </div>
        </Modal>
      );
    }
  };

  return (
    <>
      {isCode === 'codeModal' && (
        <form>
          {/* 추후 반응형 구현을 위해 일단은 min-w로 입력함 */}
          <Modal className="min-w-[531px] h-[291px] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-brown-70 text-[24px]">
                  이메일로 전송된
                </p>
                <p className="font-bold text-brown-70  text-[28px]">
                  <span className="text-brown-90">인증 번호</span>를
                  입력해주세요.
                </p>
              </div>
              <div>
                <input
                  className={`min-w-[300px] pl-4 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-[50px] bg-[center_left_12px] bg-no-repeat leading-[12px] outline-none shadow-outer/down`}
                  placeholder={SIGNIN_REQUIRE.code}
                  type="text"
                  onChange={handleCodeChange}
                />
              </div>
              <div className="flex gap-2">
                <CommonButton
                  usage="button"
                  size="md"
                  children="완료"
                  className="w-[96px] h-[52px] text-[24px]"
                  handleJudgment={handleJudgment}
                />
                <CommonButton
                  usage="button"
                  size="md"
                  children="취소"
                  className="w-[96px] h-[52px] text-[24px]"
                  handleFindCancel={() => {
                    setIsAuthEmail(!isAuthEmail);
                  }}
                />
              </div>
            </div>
          </Modal>
        </form>
      )}
      {codeFailureModal()}
    </>
  );
}

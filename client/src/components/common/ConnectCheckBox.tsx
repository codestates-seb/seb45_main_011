import Image from 'next/image';

interface CheckBoxProps {
  isChecked: true | false;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ConnectCheckBox({ isChecked }: CheckBoxProps) {
  return (
    <div className="flex items-center justify-center w-[24px] h-[24px] bg-white-10 border-brown-70 rounded-[4px] border-2 shadow-outer/down">
      {isChecked ? (
        <Image
          src={'/assets/icon/check.svg'}
          width={14}
          height={9}
          alt="check"></Image>
      ) : null}
    </div>
  );
}

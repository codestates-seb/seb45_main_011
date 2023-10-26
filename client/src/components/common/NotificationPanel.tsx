import NotificationMessage from './NotificationMessage';

export default function NotificationPanel() {
  return (
    <div className="pr-[6px] absolute left-[-177px] bottom-0 w-[160px] h-[250px] border-2  border-brown-50 rounded-lg bg-[url('/assets/img/bg_wood_light.png')] flex flex-col gap-2">
      <h3 className="inline-block mx-auto mt-[10px] py-[6px] px-[10px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-2 border-brown-70 rounded-lg font-bold text-[14px] leading-[14px] text-brown-10">
        알림 목록
      </h3>
      <div className="pb-2 w-full h-full flex flex-col items-center gap-1 overflow-x-hidden overflow-y-scroll scrollbar shadow-outer/down">
        <NotificationMessage type="writePost" num={30} />
        <NotificationMessage type="reportComment" num={1} />
        <NotificationMessage type="dailyQuiz" num={10} />
        <NotificationMessage type="writeDiary" num={10} />
        <NotificationMessage type="signup" num={500} />
        <NotificationMessage type="reportPost" num={2} />
      </div>
    </div>
  );
}

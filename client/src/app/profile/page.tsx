import ProfileForm from '@/components/profile/ProfileForm';

export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/img/bg_default.png')] bg-contain">
      <ProfileForm />
    </div>
  );
}

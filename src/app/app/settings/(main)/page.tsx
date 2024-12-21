import { auth } from "@/services/auth";
import ProfileForm from "./_components/profile-form";

const SettingsPage = async () => {
  const session = await auth();

  return <ProfileForm defaultValues={session?.user} />;
};

export default SettingsPage;

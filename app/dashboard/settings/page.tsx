import { createClient } from "@/lib/supabase/server";
import SettingsForm from "./components/settings-form";
import { getUserProfile } from "@/lib/actions";



export default async function Page() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        throw error;
    }
    const user = data.user;
    if (!user) {
        throw new Error('not logged in');
    }
    const user_profile = await getUserProfile(user.id);

    return (
        <>
            <h1 className="text-3xl font-semibold mb-8">
                Settings
            </h1>
            <SettingsForm user_profile={user_profile}/>
        </>
    )
}
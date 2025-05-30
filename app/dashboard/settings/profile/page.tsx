import Avatar from "@/components/avatar";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    //console.log(data);
    //console.log(data?.user?.email)
    const email: string = data?.user?.email || 'undefine';

    //console.log(data?.user?.id);
    const user_id = data?.user?.id;

    const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', user_id)
        .single();
    
    const username = profile!.username!;
    //console.log(username);


    return (
        <>
            <h1 className="text-3xl font-semibold mb-8">
                Profile
            </h1>
            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ml-8 md:ml-40">
                <div className="flex justify-center px-20 pt-4">
                    <div className="rounded-full border mx-auto w-max">
                        <Avatar width={150} height={150}/>
                    </div>
                </div>
                    
                <div className="flex flex-col items-center my-8 space-y-2">
                    <div>
                        <h5 className="text-lg font-medium">Username: {username}</h5>
                    </div>
                    <div>
                        <h5 className="text-lg font-medium">Email: {email}</h5>
                    </div>
                </div>
                
            </div>
        </>
    )
}
'use client';

import AlertError from '@/components/alert-error';
import AlertSuccess from '@/components/alert-success';
import DateRangeSelect from '@/components/date-range-select';
import Input from '@/components/input';
import Label from '@/components/label';
import SubmitButton from '@/components/submit-button';
import { updateSettings } from '@/lib/actions';
import { FormState } from '@/lib/consts';
import { useRouter } from 'next/navigation';

import { useActionState, useEffect } from 'react';

const initialState: FormState = {
  message: '',
  error: false,
};

interface UserProfile {
  username: string;
  range: string;
}

type SettingFormProps = {
  user_profile: UserProfile;
};

export default function SettingsForm({ user_profile }: SettingFormProps) {
  const [state, formAction, pending] = useActionState(
    updateSettings,
    initialState
  );
  const { username, range } = user_profile;

  const router = useRouter();

  useEffect(() => {
    if (!state.error && state.message) {
      router.push('/dashboard/settings');
    }
  }, [state.error, state.message, router]);

  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}
      <Label htmlFor="usernmae">Username</Label>
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        defaultValue={username}
      />

      <Label htmlFor="defaultView">Default transactions view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={range}
      />
      <SubmitButton disabled={pending}>Update Settings</SubmitButton>
    </form>
  );
}

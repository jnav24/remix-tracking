import AuthLayout from '~/components/layouts/AuthLayout';
import { ActionFunctionArgs } from '@remix-run/node';
import FormContextProvider from '~/providers/FormContextProvider';
import FormCheckbox from '~/components/forms-fields/FormCheckbox';
import FormInput from '~/components/forms-fields/FormInput';
import FormButton from '~/components/forms-fields/FormButton';
import { decryptAES } from '~/utils/encryption';
import { route } from '~/utils/routes';
import AppLink from '~/components/elements/AppLink';
import Typography from '~/components/elements/Typography';

type FormElements = {
    email: string;
    password: string;
};

export const meta = () => {
    return [{ title: 'Login Page' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = JSON.parse(decryptAES((formData.get('data') as string) || '')) as FormElements;
    console.log('----- fd', formData, formData.get('data'));
    console.log('----- decrypt', data);
    return null;
};

export default function AuthLogin() {
    return (
        <AuthLayout title='Sign in to your account'>
            <FormContextProvider isSensitive>
                <div className='mb-8 space-y-8'>
                    <FormInput label='Email' rules={['required', 'email']} />
                    <FormInput label='Password' password rules={['required']} />
                    <div className='flex justify-between'>
                        <FormCheckbox label='Remember Me' />
                        <Typography variant='caption'>
                            <AppLink to={route('auth.forgot')}>Forgot password?</AppLink>
                        </Typography>
                    </div>
                </div>

                <FormButton block submit color='primary'>
                    Login
                </FormButton>
            </FormContextProvider>

            <div className='mt-4 flex justify-center'>
                <Typography variant='caption'>
                    Don&apos;t have an account?{' '}
                    <AppLink to={route('auth.register')}>Sign up</AppLink>
                </Typography>
            </div>
        </AuthLayout>
    );
}

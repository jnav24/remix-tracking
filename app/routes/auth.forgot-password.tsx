import AuthLayout from '~/components/layouts/AuthLayout';
import FormContextProvider from '~/providers/FormContextProvider';
import FormInput from '~/components/forms-fields/FormInput';
import FormButton from '~/components/forms-fields/FormButton';
import { route } from '~/utils/routes';
import { ActionFunctionArgs } from '@remix-run/node';
import { decryptAES } from '~/utils/encryption';
import AppLink from '~/components/elements/AppLink';
import Typography from '~/components/elements/Typography';

type FormElements = {
    email: string;
};

export const meta = () => {
    return [{ title: 'Forgot Your Password' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = JSON.parse(decryptAES((formData.get('data') as string) || '')) as FormElements;
    console.log('----- fd', formData, formData.get('data'));
    console.log('----- decrypt', data);
    return null;
};

export default function AuthForgotPassword() {
    return (
        <AuthLayout title='Forgot your password?'>
            <FormContextProvider isSensitive>
                <div className='mb-8 space-y-8'>
                    <FormInput label='Email' rules={['required', 'email']} />
                </div>

                <FormButton block submit color='primary'>
                    Email Instructions
                </FormButton>
            </FormContextProvider>

            <div className='mt-4 flex justify-center'>
                <Typography variant='caption'>
                    <AppLink to={route('auth.login')}>Back to login</AppLink>
                </Typography>
            </div>
        </AuthLayout>
    );
}

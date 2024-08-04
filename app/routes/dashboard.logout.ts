import { redirect } from '@remix-run/node';
import { route } from '~/utils/routes';

export async function action() {
    return redirect(route('auth.login'));
}

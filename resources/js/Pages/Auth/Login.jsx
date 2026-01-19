import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 small fw-medium text-success">
                    {status}
                </div>
            )}

            <div className="login-card shadow-sm text-center p-4 text-center">

                <div className="mb-2 pt-0">
                    <ApplicationLogo />
                    <p className="text-muted small mt-0 mb-4">A gestão da sua Clínica de forma eficiente</p>
                    <h4 className="mb-3 fw-normal">Bem-vinda</h4>
                </div>



                <form onSubmit={submit} className="text-start">
                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Endereço de e-mail" className="label-input" />
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </span>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control w-100"
                                placeholder="usuario@exemplo.com"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)} requirid
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="password" value="Senha" className="mb-2 small" />
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </span>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-control w-100"
                                placeholder="********"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                        </div>
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="mb-4 d-flex align-items-center mt-3">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 small text-muted">
                            Lembrar Senha
                        </span>
                    </div>

                    <div className="d-grid mt-4">
                        <PrimaryButton className="btn-gold" disabled={processing}>
                            Entrar
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">

                        <div>
                            <Link href={route('password.request')} className="gold-link small">
                                Esqueceu a senha?
                            </Link>
                        </div>


                        <div className="mb-1">
                            <span className="text-muted small">Não tem uma conta? </span>

                            <Link href={route('register')} className="gold-link small">
                                Registe-se
                            </Link>

                        </div>
                    </div>

                </form>
            </div>

        </GuestLayout>
    );
}

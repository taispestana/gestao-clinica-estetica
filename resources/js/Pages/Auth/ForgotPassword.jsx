import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="login-card shadow-sm text-center p-5 text-center">

                <div className="mb-4">
                    <ApplicationLogo />
                    <p className="text-muted small mt-0 mb-4">A gestão da sua Clínica de forma eficiente</p>
                    <h2 className="mb-3 fw-normal">Esqueceu a senha?</h2>
                    <p className="text-muted small mt-0 mb-2">Sem problemas. Basta nos informar seu endereço de e-mail
                        e enviaremos um link para redefinir sua senha, que
                        permitirá que você escolha uma nova.</p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

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
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="d-grid mt-4">
                        <PrimaryButton className="btn-gold" disabled={processing}>
                            Redefinir Senha
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">
                        <Link href={route('login')} className="gold-link small">
                            Voltar para o Login
                        </Link>
                    </div>
                </form>

            </div>
        </GuestLayout>
    );
}

import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    // Formulário de registro
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Função de envio do formulário
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Renderização do formulário
    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="login-card shadow-sm text-center p-4">
                <div className="mb-4 pt-0">
                    <ApplicationLogo />
                    <p className="text-muted small mt-0 mb-4">A gestão da sua Clínica de forma eficiente</p>
                    <h4 className="mb-3 fw-normal">Criar Conta</h4>
                </div>

                <form onSubmit={submit} className="text-start">
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Nome" className="label-input" />
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="form-control w-100"
                                placeholder="Seu nome completo"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="input-error-msg" />
                    </div>

                    <div className="mb-2">
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>

                        <InputError message={errors.password} className="mt-1" />

                    </div>

                    <div className="mt-2">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Senha"
                            className="mb-2 small"
                        />
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </span>

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="form-control w-100"
                                placeholder="********"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation} className="input-error-msg" />
                        </div>
                    </div>

                    <div className="d-grid mt-4">
                        <PrimaryButton className="btn-gold" disabled={processing}>
                            Registar
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">
                        <span className="text-muted small">Já tem uma conta? </span>
                        <Link href={route('login')} className="gold-link small">
                            Entrar
                        </Link>
                    </div>

                </form>
            </div>
        </GuestLayout>
    );
}

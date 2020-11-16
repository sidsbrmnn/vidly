import { NextPage } from 'next';
import Link from 'next/link';
import Head from '../components/head';

const SigninPage: NextPage = () => {
    return (
        <>
            <Head title="Sign in" />

            <main id="content">
                <section className="flex items-center justify-center min-h-screen py-12">
                    <div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
                        <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
                            Sign in to your account
                        </h2>
                        <form
                            className="px-4 py-8 mt-8 bg-white rounded-md shadow-md sm:px-6 lg:px-8"
                            noValidate={true}
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-semibold text-gray-600"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full transition duration-150 ease-in-out form-input focus:border-indigo-400 focus:shadow-outline-indigo"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-sm font-semibold text-gray-600"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full transition duration-150 ease-in-out form-input focus:border-indigo-400 focus:shadow-outline-indigo"
                                />
                            </div>
                            <div className="flex flex-col mb-6 sm:flex-row sm:justify-between sm:items-center">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out focus:border-indigo-400 focus:shadow-outline-indigo form-checkbox"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="block ml-2 text-sm leading-5 text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link href="/password/reset">
                                    <a className="text-sm font-medium leading-5 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                                        Forgot your password?
                                    </a>
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="block w-full px-4 py-3 text-sm font-semibold leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SigninPage;

// react
import { memo } from 'react';
// components
import { FieldLayout } from '@/shared/layouts';
// utils
import { classNames } from '@/shared/utils';

const SignInForm = memo(() => {
    return (
        <form
            className="flex flex-col p-4 gap-2 w-full max-w-sm"
            onSubmit={event => event.preventDefault()}>
            <div className="flex flex-col items-center font-semibold">
                <h1 className="text-2xl">OnLab-Clinical</h1>

                <span className="text-lg">Sign in</span>
            </div>

            <hr className="border-b border-dark-400" />

            <fieldset className="flex flex-col">
                <FieldLayout
                    hasError
                    className={{
                        content: ({ hasError }) =>
                            classNames(
                                'border border-primary-600',
                                hasError && 'border-danger-600'
                            ),
                    }}
                    title={<label htmlFor="user">User name:</label>}
                    input={<input type="text" id="user" name="user" className="input" />}
                    hint={({ hasError }) => (
                        <span
                            className={classNames(
                                'text-center text-sm',
                                hasError && 'text-danger-600'
                            )}>
                            User name
                        </span>
                    )}
                />

                <FieldLayout
                    hasError
                    className={{
                        content: ({ hasError }) =>
                            classNames(
                                'border border-primary-600',
                                hasError && 'border-danger-600'
                            ),
                    }}
                    title={<label htmlFor="password">User password:</label>}
                    input={
                        <input type="password" id="password" name="password" className="input" />
                    }
                    hint={({ hasError }) => (
                        <span
                            className={classNames(
                                'text-center text-sm',
                                hasError && 'text-danger-600'
                            )}>
                            User password
                        </span>
                    )}
                />
            </fieldset>
        </form>
    );
});

export default SignInForm;

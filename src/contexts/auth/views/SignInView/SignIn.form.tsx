// react
import { memo } from 'react';
import { Link } from 'react-router-dom';
// components
import { Button, Icon, InputField } from '@/shared/components';
// assets
import { mdiAccountCircle, mdiEyeLock, mdiEyeLockOpen, mdiLock, mdiLockOpen } from '@mdi/js';

const SignInForm = memo(() => {
    const isOpen = false;

    return (
        <form
            className="flex flex-col p-4 gap-4 w-full max-w-sm rounded-sm shadow-md shadow-light-500 theme-dark:shadow-dark-500"
            onSubmit={event => {
                event.preventDefault();
            }}>
            <div className="flex flex-col items-center font-semibold">
                <h1 className="text-2xl">OnLab-Clinical</h1>

                <span className="text-lg">Sign in</span>
            </div>

            <fieldset className="flex flex-col gap-4">
                <InputField
                    title="User name:"
                    before={<Icon className="text-xl" path={mdiAccountCircle} />}
                    input={<input type="text" id="user" placeholder="User name" />}
                    hint=""
                    isHintReserved
                    inputId="user"
                    styleStrategy="primary"
                />

                <InputField
                    title="Password:"
                    before={<Icon className="text-xl" path={isOpen ? mdiLockOpen : mdiLock} />}
                    input={<input type="password" id="password" placeholder="User password" />}
                    after={
                        <button type="button">
                            <Icon className="text-xl" path={isOpen ? mdiEyeLock : mdiEyeLockOpen} />
                        </button>
                    }
                    hint=""
                    isHintReserved
                    inputId="password"
                    styleStrategy="primary"
                />
            </fieldset>

            <Button type="submit" styleStrategy="primary">
                <span>Sign In</span>
            </Button>

            <span>
                <span>If you dont have an account, please </span>

                <Link to="../sign-up" className="text-secondary-600 underline">
                    create one her!
                </Link>
            </span>
        </form>
    );
});

export default SignInForm;

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from 'nativewind';
import React from 'react';
import colors from 'tailwindcss/colors';
import { useHapticNavigation } from '../hooks/hapticNavigation';
import { localization } from '../localization';
import { SignInMethod } from '../services/authServices';
import { selectAuth, useAuthStore } from '../domain/store/useAuthStore';

interface SignInButtonProps {
  onPress: () => Promise<void>;
  label: string;
  className?: string;
  icon?: React.ReactNode;
  testID?: string;
  disabled?: boolean;
}

const SignInButton: React.FC<SignInButtonProps> = (props) => {
  const { onPress, icon, label, testID, disabled = false, className } = props;
  const { colorScheme } = useColorScheme();

  return (
    <Button
      onPress={onPress}
      accessibilityLabel={label}
      className={`rounded-xl ${className || ''} bg-secondary-700`}
      disabled={disabled}
      testID={testID}
    >
      {icon}
      <ButtonText className={`text-${colorScheme === 'dark' ? 'white' : 'black'} font-medium`}>
        {label}
      </ButtonText>
    </Button>
  );
};

const SignInPage: React.FC = () => {
  const { replaceWithHaptic } = useHapticNavigation();
  const { signIn, isAuthLoading } = useAuthStore(selectAuth);
  const { colorScheme } = useColorScheme();

  const handleSignIn = async ({ type }: { type: SignInMethod }) => {
    try {
      await signIn({ type });
      replaceWithHaptic({ screen: 'Main', hapticType: 'impactLight' });
    } catch (error) {
      console.error(`[SignInPage/handleSignIn/${type}/Failed]:`, error);
    }
  };

  const LoadingView = () => {
    return (
      <Center className='absolute inset-0 bg-primary-600/90 z-10 flex-1'>
        <Spinner size='small' color={colorScheme !== 'dark' ? colors.white : colors.black} />
      </Center>
    );
  };

  return (
    <Box className='bg-primary-900 flex-1 px-4'>
      {isAuthLoading && <LoadingView />}
      <VStack reversed={false} className='flex-1 justify-center' space='md'>
        <SignInButton
          onPress={async () => handleSignIn({ type: 'Google' })}
          label={localization.signIn.buttonSignInWithGoogle}
          disabled={isAuthLoading}
          testID='google-sign-in'
        />
      </VStack>
    </Box>
  );
};

export default SignInPage;

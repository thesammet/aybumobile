import email from 'react-native-email'

export const handleEmail = () => {
    const to = ['samedakgul99@gmail.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: ['mertcankose97@outlook.com'], // string or array of email addresses
        subject: 'Aybü Mobil',
        body: ''
        //   checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
}
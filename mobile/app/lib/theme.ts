import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  components: {
    Input: {
      inputContainerStyle: {
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
      },
    },
  },
});

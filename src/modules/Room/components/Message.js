import colors from 'app/assets/style/colors';
import { UserRoles } from 'app/constants/Roles';
import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Message({ message: { user, content, time } }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      marginTop: 16,
    },
    isOwn: {
      justifyContent: 'flex-end',
    },
    message: {
      backgroundColor: colors.orange[100],
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      maxWidth: '80%',
    },
    ownMessage: {
      backgroundColor: colors.orange[200],
    },
    name: {
      color: colors.orange[1000],
      fontWeight: 'bold',
      marginRight: 8,
    },
    time: {
      fontSize: 12,
      color: colors.orange[1000],
      width: '100%',
      textAlign: 'right',
      marginTop: 4,
    },
  });

  const currentUser = useSelector(state => state.user);

  const isOwn = () => currentUser.uid === user.uid;

  return (
    <View style={[styles.container, isOwn() ? styles.isOwn : null]}>
      <View style={[styles.message, isOwn() ? styles.ownMessage : null]}>
        <Text>{content}</Text>
        <Text style={styles.time}>
          {time ? format(new Date(time), 'hh:mm') : null}
        </Text>
      </View>
    </View>
  );
}

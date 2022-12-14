import React, { useState, createContext, useEffect } from 'react';
import { storage } from '../config/storage';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [role, setRole] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);

  useEffect(() => {
    profileControl();
  }, []);

  const profileControl = async () => {
    try {
      const username = storage.getString('username');
      const faculty = storage.getString('faculty');
      const department = storage.getString('department');
      const departmentCode = storage.getString('department_code');
      const role = storage.getString('role')
      if (username) {
        setUsername(username);
      }
      if (faculty) {
        setFaculty(faculty);
      }
      if (department) {
        setDepartment(department);
      }
      if (role) {
        setRole(role)
      }
      if (departmentCode) {
        setDepartmentCode(departmentCode)
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const addUsername = async value => {
    setUsername(value);
    try {
      storage.set('username', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const addFaculty = async value => {
    setFaculty(value);
    try {
      storage.set('faculty', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const addRole = async value => {
    setRole(value);
    try {
      storage.set('role', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const addDepartment = async value => {
    setDepartment(value);
    try {
      storage.set('department', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const addDepartmentCode = async value => {
    setDepartmentCode(value);
    try {
      storage.set('department_code', value);
    } catch (error) {
      console.warn(error);
    }
  }

  const removeToken = async () => {
    setUsername(null);
    setFaculty(null);
    setDepartment(null);
    setRole(null)
    setDepartmentCode(null)
    try {
      storage.delete('username');
      storage.delete('department');
      storage.delete('faculty');
      storage.delete('role');
      storage.delete('department_code');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        username,
        department,
        faculty,
        addUsername,
        addFaculty,
        addDepartment,
        role,
        addRole,
        departmentCode,
        addDepartmentCode,
        removeToken
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

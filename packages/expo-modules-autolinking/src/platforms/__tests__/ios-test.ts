import { formatArrayOfReactDelegateHandler, normalizePodModule } from '../ios';

describe(formatArrayOfReactDelegateHandler, () => {
  it('should output empty array when no one specify `reactDelegateHandlers`', () => {
    const modules = [
      {
        packageName: 'expo-constants',
        packageVersion: '10.0.1',
        podName: 'EXConstants',
        podspecDir: '/path/to/expo/packages/expo-constants/ios',
        flags: { inhibit_warnings: false },
        modulesClassNames: [],
        appDelegateSubscribers: [],
        reactDelegateHandlers: [],
      },
    ];
    expect(formatArrayOfReactDelegateHandler(modules)).toBe(`[
    ]`);
  });

  it('should output array of `(packageName, klass)` tuple', () => {
    const modules = [
      {
        packageName: 'expo-constants',
        packageVersion: '10.0.1',
        podName: 'EXConstants',
        podspecDir: '/path/to/expo/packages/expo-constants/ios',
        flags: { inhibit_warnings: false },
        modulesClassNames: [],
        appDelegateSubscribers: [],
        reactDelegateHandlers: ['ConstantsReactDelegateHandler', 'ConstantsReactDelegateHandler2'],
      },
      {
        packageName: 'expo-device',
        packageVersion: '4.0.1',
        podName: 'EXDevice',
        podspecDir: '/path/to/expo/packages/expo-device/ios',
        flags: { inhibit_warnings: false },
        modulesClassNames: [],
        appDelegateSubscribers: [],
        reactDelegateHandlers: ['DeviceReactDelegateHandler'],
      },
    ];
    expect(formatArrayOfReactDelegateHandler(modules)).toBe(`[
      (packageName: "expo-constants", klass: ConstantsReactDelegateHandler.self),
      (packageName: "expo-constants", klass: ConstantsReactDelegateHandler2.self),
      (packageName: "expo-device", klass: DeviceReactDelegateHandler.self)
    ]`);
  });
});

describe(normalizePodModule, () => {
  it('should transform expo-dev-launcher to EXDevLauncher', () => {
    expect(normalizePodModule('expo-dev-launcher')).toBe('EXDevLauncher');
  });
});

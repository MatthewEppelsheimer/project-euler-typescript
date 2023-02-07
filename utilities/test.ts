export default function (options?: { reportPassingTests: boolean }) {
  const reportPassingTests = options?.reportPassingTests || false;

  return function test<T extends (...args: Array<any>) => any>(
    testName: string,
    assertions: () => void,
    output: ReturnType<T>
  ) {
    const fail = (testName: string, output: ReturnType<T>) => {
      console.error(`Failed test "${testName}":`);
    };
    const pass = (testName: string) => {
      reportPassingTests && console.log(`Passed test "${testName}".`);
    };

    try {
      assertions();
      pass(testName);
    } catch (error: unknown) {
      fail(testName, output);
      throw error;
    }
  };
}

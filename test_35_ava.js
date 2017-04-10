/**
 * Created by yuanyuan on 17/3/28.
 */
import test from 'ava';

test('foo', t => {
    t.pass();
});

test('bar',async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar,'bar');
});
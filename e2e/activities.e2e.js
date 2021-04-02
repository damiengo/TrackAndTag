
const fillTextField = async (fieldId, value) => {
  const field = await element(by.id(fieldId));
  await field.tap();
  await field.replaceText(value);
};

const fillDateField = async (fieldId, value) => {
  const field = await element(by.id(fieldId));
  await field.tap();
  const cancel = await element(by.text('CANCEL'));
  await cancel.tap();
  await field.replaceText(value);
};

describe('Activities', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be visible on activities screen', async () => {
    await expect(element(by.text('Activities'))).toBeVisible();
  });

  it('should be addable and editable', async () => {
    await element(by.id('add_button')).tap();
    await expect(element(by.text('New activity'))).toBeVisible();
    await expect(element(by.id('button_delete'))).not.toBeVisible();
    // Fill fields
    await fillTextField('input_tags', 'tag1 tag2 tag3');
    await fillTextField('input_title', 'Title 1');
    await fillTextField('input_description', 'Description 1');
    await fillTextField('input_number', '98');
    await fillDateField('input_date', '12/07/1998');
    await element(by.id('button_save')).tap();
    // Activities screen with new activity visible
    await expect(element(by.text('Activities'))).toBeVisible();
    await expect(element(by.text('Title 1'))).toBeVisible();
    await expect(element(by.text('tag1 tag2 tag3'))).toBeVisible();
    const elem1 = await element(by.text('Title 1'));
    await elem1.tap();
    // Activity editable
    await expect(element(by.text('Edit activity'))).toBeVisible();
    await fillTextField('input_title', 'Title 1.1');
    await fillTextField('input_tags', 'tag1 tag8 tag3');
    await element(by.id('button_save')).tap();
    await expect(element(by.text('Activities'))).toBeVisible();
    await expect(element(by.text('Title 1.1'))).toBeVisible();
    await expect(element(by.text('tag1 tag8 tag3'))).toBeVisible();
    // Activity deletable
    const elem11 = await element(by.text('Title 1.1'));
    await elem11.tap();
    await expect(element(by.id('button_delete'))).toBeVisible();
  });

});

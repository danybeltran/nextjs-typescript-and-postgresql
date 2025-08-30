import {
  mutateData,
  revalidate,
  useObject,
  useServerAction
} from 'atomic-utils'
import { updateUserPreferences } from './actions'

import { Button, Input, Textarea } from '@/components/ui'
import { VscLoading } from 'react-icons/vsc'
import { UpdatePreferencesPayload } from '@/schemas'
import { usePreferences } from '@/hooks/use-preferences'
import { SaveIcon } from 'lucide-react'

export default function UpdateProfile() {
  const { data: preferences } = usePreferences()

  const [newPreferences, newPreferencesActions] =
    useObject<UpdatePreferencesPayload>({
      user_fullname: preferences.user_fullname,
      user_description: preferences.user_description
    })

  const { reFetch: savePreferences, isPending: savingPreferences } =
    useServerAction(updateUserPreferences, {
      params: newPreferences,
      onResolve(updatedPreferences) {
        mutateData(['Preferences', updatedPreferences])
        revalidate('Preferences')
      }
    })

  const hasChanges = ['user_fullname', 'user_description'].some(
    preference => preferences[preference] !== newPreferences[preference]
  )

  return (
    <form
      className='space-y-4 md:w-1/2 border p-4 rounded-lg shadow-lg'
      action={savePreferences}
      onSubmit={e => {
        if (!hasChanges) e.preventDefault()
      }}
    >
      <h3 className='text-lg font-semibold'>Update preferences</h3>
      <div>
        <label>
          <small>Full name</small>
          <Input
            placeholder='Add a name'
            disabled={savingPreferences}
            value={newPreferences.user_fullname}
            onChange={e =>
              newPreferencesActions.setPartialValue({
                user_fullname: e.target.value
              })
            }
          />
        </label>
      </div>

      <div>
        <label>
          <small>Bio</small>
          <Textarea
            className='h-24 resize-none'
            disabled={savingPreferences}
            placeholder='Add a description'
            value={newPreferences.user_description}
            onChange={e =>
              newPreferencesActions.setPartialValue({
                user_description: e.target.value
              })
            }
          />
        </label>
      </div>

      {hasChanges && (
        <div className='space-x-2 flex items-center'>
          <Button
            variant='ghost'
            type='button'
            disabled={savingPreferences}
            onClick={newPreferencesActions.reset}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={savingPreferences}>
            {savingPreferences ? (
              <VscLoading className='animate-spin' />
            ) : (
              <SaveIcon />
            )}
            Save
          </Button>
        </div>
      )}
    </form>
  )
}

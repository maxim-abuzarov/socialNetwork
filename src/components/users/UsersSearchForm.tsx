import {Field, Form, Formik} from 'formik'
import React, {FC} from 'react'
import searchFormClasses from './searchform.module.css'
import {FilterType} from '../../redux/reducers/usersReducer'
import {useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/selectors/usersSelectors'

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
	term: string
	friend: FriendFormType
}


const UsersSearchForm: FC<PropsType> = React.memo(({onFilterChanged}) => {
	const filter = useSelector(getUsersFilter)

	const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null'
				? null
				: values.friend === 'true'
					? true
					: false
		}
		onFilterChanged(filter)
		setSubmitting(false)
	}

	return (
		<div className={searchFormClasses.form}>
			<Formik
				enableReinitialize
				initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
				onSubmit={submit}
			>

			{
				({isSubmitting}) => (
					<Form>
						<Field type='text' name='term' placeholder='Enter name' />
						<Field name='friend' as='select'>
							<option value='null'>All</option>
							<option value='true'>Only followed</option>
							<option value='false'>Only unfollowed</option>
						</Field>
						<button type='submit' disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)
			}
			</Formik>
		</div>
	)
})

export default UsersSearchForm

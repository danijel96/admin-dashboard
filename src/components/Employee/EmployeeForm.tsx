import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// internal imports
import { CreateEmployee } from 'common/contracts/api/payload/employee';
import { CustomInput } from 'components/Atoms/CustomInput';

const validationSchema = yup.object({
	email: yup
		.string()
		.required('Required field')
		.email('Email must be valid')
		.lowercase('All letters need to be lowercase')
		.strict(true),
	dateOfBirth: yup.string().required('Required field'),
	dateOfEmployment: yup.string().required('Required field'),
	homeAddress: yup.object({
		ZIPCode: yup.string().required('Required field'),
		addressLine1: yup.string().required('Required field'),
		addressLine2: yup.string(),
		city: yup.string().required('Required field'),
	}),
	name: yup.string().required('Required field'),
	phoneNumber: yup.string().required('Required field'),
});

interface EmployeeFormProps {
	onSubmit: (data: CreateEmployee) => void;
	initialData?: CreateEmployee;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
	onSubmit,
	initialData,
}) => {
	const router = useRouter();

	const getDefaultValues = async () => {
		return {
			dateOfBirth: initialData?.dateOfBirth
				? new Date(initialData?.dateOfBirth).toISOString().split('T')[0]
				: '',
			dateOfEmployment: initialData?.dateOfEmployment
				? new Date(initialData?.dateOfEmployment).toISOString().split('T')[0]
				: '',
			email: initialData?.email || '',
			homeAddress: initialData?.homeAddress || {
				ZIPCode: '',
				addressLine1: '',
				addressLine2: '',
				city: '',
			},
			name: initialData?.name || '',
			phoneNumber: initialData?.phoneNumber || '',
		};
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateEmployee>({
		defaultValues: () => getDefaultValues(),
		resolver: yupResolver(validationSchema),
	});

	const handleCancel = () => {
		router.back();
	};

	return (
		<form
			role="form"
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-y-3 px-5 min-w-[350px] max-w-[400px] justify-center mx-auto"
		>
			<CustomInput
				className={clsx(errors.email && 'input-error')}
				id="email"
				{...register('email')}
				label="Email"
				placeholder="Enter employee e-mail"
				errors={errors.email?.message}
			/>
			<CustomInput
				className={clsx(errors.name && 'input-error')}
				id="name"
				{...register('name')}
				label="Name"
				placeholder="Enter employee name"
				errors={errors.name?.message}
			/>
			<CustomInput
				className={clsx(errors.phoneNumber && 'input-error')}
				id="phoneNumber"
				{...register('phoneNumber')}
				label="Phone Number"
				placeholder="Enter employee phone number"
				errors={errors.phoneNumber?.message}
			/>
			<CustomInput
				className={clsx(errors.dateOfBirth && 'input-error')}
				type="date"
				id="dateOfBirth"
				{...register('dateOfBirth')}
				label="Date of Birth"
				placeholder="Enter employee date of birth"
				errors={errors.dateOfBirth?.message}
			/>
			<CustomInput
				className={clsx(errors.dateOfEmployment && 'input-error')}
				type="date"
				id="dateOfEmployment"
				{...register('dateOfEmployment')}
				label="Date of Employment"
				placeholder="Enter employee date of employment"
				errors={errors.dateOfEmployment?.message}
			/>
			<CustomInput
				className={clsx(errors.homeAddress?.ZIPCode && 'input-error')}
				id="homeAddress.ZIPCode"
				{...register('homeAddress.ZIPCode')}
				label="ZIP Code"
				placeholder="Enter employee ZIP code"
				errors={errors.homeAddress?.ZIPCode?.message}
			/>
			<CustomInput
				className={clsx(errors.homeAddress?.addressLine2 && 'input-error')}
				id="homeAddress.addressLine1"
				{...register('homeAddress.addressLine1')}
				label="Address 1"
				placeholder="Enter employee Address 1"
				errors={errors.homeAddress?.addressLine1?.message}
			/>
			<CustomInput
				className={clsx(errors.homeAddress?.addressLine2 && 'input-error')}
				id="homeAddress.addressLine2"
				{...register('homeAddress.addressLine2')}
				label="Address 2"
				placeholder="Enter employee Address 2"
				errors={errors.homeAddress?.addressLine2?.message}
			/>
			<CustomInput
				className={clsx(errors.homeAddress?.city && 'input-error')}
				id="homeAddress.city"
				{...register('homeAddress.city')}
				label="City"
				placeholder="Enter employee city"
				errors={errors.homeAddress?.city?.message}
			/>
			<button
				className={clsx('btn', initialData ? 'btn-yellow' : 'btn-blue')}
				type="submit"
			>
				{initialData ? 'Edit Employee' : 'Create Employee'}
			</button>
			<button
				type="button"
				className="text-font-primary"
				onClick={handleCancel}
			>
				Cancel
			</button>
		</form>
	);
};
